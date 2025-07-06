import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  PlayIcon,
  StopIcon,
  PauseIcon
} from '@heroicons/react/24/outline'

const songList = [
  '/RomaniaGame.mp3',
  '/DoarLaScoala.mp3',
  '/FizicaCuantica.mp3',
  '/LaOrashel.mp3',
  '/Formulaua1.mp3'
]

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)

  const handlePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(err => {
        console.warn('Playback failed:', err)
      })
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const handleStop = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
    setIsPlaying(false)
  }

  const handleNext = () => {
    const next = (currentTrack + 1) % songList.length
    setCurrentTrack(next)
  }

  const handlePrev = () => {
    const prev = (currentTrack - 1 + songList.length) % songList.length
    setCurrentTrack(prev)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.src = songList[currentTrack]
    audio.load()

    const handleEnded = () => {
      const next = (currentTrack + 1) % songList.length
      setCurrentTrack(next)
    }

    audio.addEventListener('ended', handleEnded)
    return () => {
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentTrack])

  return (
    <div className="flex space-x-1 items-center justify-center">
      <audio ref={audioRef} preload="auto" />
      <button onClick={handlePrev} className="px-2 py-1">
        <ArrowLeftEndOnRectangleIcon className="size-8 md:size-6 text-blue-500" />
      </button>
      <button onClick={handlePlayPause} className="px-2 py-1">
        {isPlaying ? (
          <PauseIcon className="size-8 md:size-6 text-blue-500" />
        ) : (
          <PlayIcon className="size-8 md:size-6 text-blue-500" />
        )}
      </button>
      <button onClick={handleStop} className="px-2 py-1">
        <StopIcon className="size-8 md:size-6 text-blue-500" />
      </button>
      <button onClick={handleNext} className="px-2 py-1">
        <ArrowRightEndOnRectangleIcon className="size-8 md:size-6 text-blue-500" />
      </button>
    </div>
  )
}

export default AudioPlayer
