"use client"

import { Button } from "@/components/ui/Button/Button"
import { Facebook, Twitter, Linkedin, Link2, Mail } from "lucide-react"

interface ShareButtonsProps {
  url: string
  title: string
  onClose: () => void
}

export function ShareButtons({ url, title, onClose }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      alert("Link copied to clipboard!")
      onClose()
    } catch {
      alert("Failed to copy. Please copy the link manually.")
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[200px]">
      <div className="space-y-2">
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => {
              window.open(link.url, "_blank", "noopener,noreferrer")
              onClose()
            }}
          >
            <link.icon className="w-4 h-4 mr-2" />
            {link.name}
          </Button>
        ))}

        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={copyToClipboard}>
          <Link2 className="w-4 h-4 mr-2" />
          Copy Link
        </Button>
      </div>
    </div>
  )
}
