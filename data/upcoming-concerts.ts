// Archivo: /data/upcoming-concerts.ts
// Data modularizada de conciertos próximos para el Hero Section

export interface Concert {
  id: number;
  band: string;
  logo: string;
  date: string;
  venue: string;
  city: string;
  image: string;
  merchPreview: string;
  color: string;
  ticketProvider: string;
  ticketUrl: string;
  message: string;
  spotifyId: string;
  shirts: string[];
}

export const upcomingConcerts: Concert[] = [
  {
    id: 1,
    band: "Guns N' Roses",
    logo: "/upcoming-concerts/guns-n-roses/logo.png",
    date: "5 de Noviembre",
    venue: "Estadio Nacional",
    city: "Lima",
    image: "/media/v1/upcoming-concerts-guns-n-roses-banner.webp",
    merchPreview: "/placeholder.svg?height=400&width=600",
    color: "#ff0000",
    ticketProvider: "Teleticket",
    ticketUrl: "https://teleticket.com.pe/guns-n-roses-lima-2025",
    message: "¡No te pierdas el regreso de Guns N' Roses a Lima! Consigue el merch oficial antes de que se agote.",
    spotifyId: "3qm84nBOXUEQ2vnTfUTTFC",
    shirts: [
      "/media/v1/shirts-guns-n-roses-shirt1.webp",
      "/media/v1/shirts-guns-n-roses-shirt2.webp",
      "/media/v1/shirts-guns-n-roses-shirt3.webp",
    ],
  },
  {
    id: 2,
    band: "My Chemical Romance",
    logo: "/upcoming-concerts/my-chemical-romance/logo.png",
    date: "25 de Enero",
    venue: "Estadio Nacional",
    city: "Lima",
    image: "/upcoming-concerts/my-chemical-romance/banner.png",
    merchPreview: "/placeholder.svg?height=400&width=600",
    color: "#a90000",
    ticketProvider: "Ticketmaster",
    ticketUrl: "https://www.ticketmaster.pe/event/my-chemical-romance",
    message: "My Chemical Romance regresa a Lima con su gira mundial. ¡Consigue tu merch exclusivo para el show!",
    spotifyId: "7FBcuc1gsnv6Y1nwFtNRCb",
    shirts: [
      "/media/v1/shirts-my-chemical-romance-shirt1.webp",
      "/media/v1/shirts-my-chemical-romance-shirt2.webp",
      "/media/v1/shirts-my-chemical-romance-shirt3.webp",
    ],
  },
  {
    id: 3,
    band: "Green Day",
    logo: "/upcoming-concerts/green-day/logo.png",
    date: "27 de Agosto",
    venue: "Estadio San Marcos",
    city: "Lima",
    image: "/media/v1/upcoming-concerts-green-day-banner.webp",
    merchPreview: "/placeholder.svg?height=400&width=600",
    color: "#ec0981",
    ticketProvider: "Ticketmaster",
    ticketUrl: "https://www.ticketmaster.pe/event/green-day-estadio-san-marcos-2025",
    message: "Green Day llega a Lima con su tour épico. ¡No te quedes sin tu merch oficial!",
    spotifyId: "7oPftvlwr6VrsViSDV7fJY",
    shirts: [
      "/media/v1/shirts-green-day-shirt1.webp",
      "/media/v1/shirts-green-day-shirt2.webp",
      "/media/v1/shirts-green-day-shirt3.webp",
    ],
  },
]
