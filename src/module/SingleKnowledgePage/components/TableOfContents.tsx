"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface TableOfContentsProps {
  content: string
  headerOffset?: number
}

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents({ content, headerOffset = 120 }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const observerRef = useRef<IntersectionObserver | null>(null)
  const isScrollingRef = useRef(false)

  useEffect(() => {
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = content
    const headingElements = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6")
    const extractedHeadings: Heading[] = []

    headingElements.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`
      heading.id = id
      extractedHeadings.push({
        id,
        text: heading.textContent || "",
        level: Number.parseInt(heading.tagName.charAt(1)),
      })
    })

    setHeadings(extractedHeadings)

    const articleElement = document.querySelector("article")
    if (articleElement) {
      articleElement.innerHTML = tempDiv.innerHTML
    }
  }, [content])

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    if (headings.length === 0) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return

        const visibleEntries = entries.filter((entry) => entry.isIntersecting)

        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, current) => {
            if (current.intersectionRatio > prev.intersectionRatio) {
              return current
            }
            if (current.intersectionRatio === prev.intersectionRatio) {
              return current.boundingClientRect.top < prev.boundingClientRect.top ? current : prev
            }
            return prev
          })

          setActiveId(mostVisible.target.id)
        }
      },
      {
        rootMargin: `-${headerOffset}px 0% -80% 0%`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element && observerRef.current) {
        observerRef.current.observe(element)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [headings, headerOffset])

  const handleClick = (headingId: string) => {
    isScrollingRef.current = true

    setActiveId(headingId)

    const element = document.getElementById(headingId)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }

    setTimeout(() => {
      isScrollingRef.current = false
    }, 1000)
  }

  if (headings.length === 0) return null

  return (
    <nav className="space-y-2">
      <h3 className="font-semibold text-black mb-4">Table of Contents</h3>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block py-1 text-gray-600 hover:text-black transition-colors cursor-pointer",
                heading.level === 2 && "pl-0",
                heading.level === 3 && "pl-4",
                heading.level === 4 && "pl-8",
                heading.level >= 5 && "pl-12",
                activeId === heading.id && "text-royal-gold font-medium",
              )}
              onClick={(e) => {
                e.preventDefault()
                handleClick(heading.id)
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
