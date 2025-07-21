"use client"

import React, { createContext, useContext, useRef, useCallback, useEffect } from "react"
import { usePathname } from "next/navigation"

type ScrollRestorationContextType = {
  saveScrollPosition: (key: string, position: number) => void
  getScrollPosition: (key: string) => number | undefined
  clearScrollPosition: (key: string) => void
}

const ScrollRestorationContext = createContext<ScrollRestorationContextType | undefined>(undefined)

export function useScrollRestoration() {
  const context = useContext(ScrollRestorationContext)
  if (!context) {
    throw new Error("useScrollRestoration must be used within a ScrollRestorationProvider")
  }
  return context
}

export function ScrollRestorationProvider({ children }: { children: React.ReactNode }) {
  const scrollPositions = useRef<Map<string, number>>(new Map())
  const pathname = usePathname()
  const prevPathnameRef = useRef<string | null>(null)

  const saveScrollPosition = useCallback((key: string, position: number) => {
    scrollPositions.current.set(key, position)
  }, [])

  const getScrollPosition = useCallback((key: string) => {
    return scrollPositions.current.get(key)
  }, [])

  const clearScrollPosition = useCallback((key: string) => {
    scrollPositions.current.delete(key)
  }, [])

  useEffect(() => {
    // Logic to handle scroll behavior on route changes
    if (prevPathnameRef.current === "/" && pathname !== "/") {
      // Navigating away from the landing page, save its scroll position
      saveScrollPosition("landing-page-scroll", window.scrollY)
    } else if (pathname === "/" && prevPathnameRef.current !== "/") {
      // Navigating back to the landing page, restore its scroll position
      const savedPosition = getScrollPosition("landing-page-scroll")
      if (savedPosition !== undefined) {
        window.scrollTo(0, savedPosition)
        clearScrollPosition("landing-page-scroll") // Clear after restoring
      } else {
        window.scrollTo(0, 0) // Fallback to top if no saved position
      }
    } else if (pathname !== "/") {
      // Navigating to any other page (not home), ensure it loads at the top
      window.scrollTo(0, 0)
    }

    prevPathnameRef.current = pathname
  }, [pathname, saveScrollPosition, getScrollPosition, clearScrollPosition])

  const value = React.useMemo(
    () => ({ saveScrollPosition, getScrollPosition, clearScrollPosition }),
    [saveScrollPosition, getScrollPosition, clearScrollPosition],
  )

  return <ScrollRestorationContext.Provider value={value}>{children}</ScrollRestorationContext.Provider>
}
