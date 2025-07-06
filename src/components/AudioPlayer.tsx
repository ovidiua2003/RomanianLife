import { useEffect, useRef, useState } from 'react'
import { ArrowLeftEndOnRectangleIcon, ArrowRightEndOnRectangleIcon, PlayIcon, StopIcon, PauseIcon } from '@heroicons/react/24/outline'

const songList = [
    '/RomaniaGame.mp3',
    '/DoarLaScoala.mp3',
    '/FizicaCuantica.mp3',
    '/LaOrashel.mp3',
    '/Formulaua1.mp3'
]


const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)

  const loadAndPlay = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    const newAudio = new Audio(songList[index])
    newAudio.loop = false;
    newAudio.play()
    audioRef.current = newAudio
    setIsPlaying(true)

    newAudio.addEventListener('ended', () => {
        const next = (index + 1) % songList.length
        setCurrentTrack(next)
        loadAndPlay(next)
    })
  }

  const handlePlayPause = () => {
    if (!audioRef.current) {
      loadAndPlay(currentTrack)
    } else if (audioRef.current.paused) {
      audioRef.current.play()
      setIsPlaying(true)
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsPlaying(false)
  }

  const handleNext = () => {
    const next = (currentTrack + 1) % songList.length
    setCurrentTrack(next)
    loadAndPlay(next)
  }

  const handlePrev = () => {
    const prev = (currentTrack - 1 + songList.length) % songList.length
    setCurrentTrack(prev)
    loadAndPlay(prev)
  }

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  return (
    <div className="flex space-x-1">
        
      <button onClick={handlePrev} className="px-2 py-1">
        <ArrowLeftEndOnRectangleIcon className="size-6 text-blue-500" />
      </button>
      <button onClick={handlePlayPause} className="px-2 py-1">
        {isPlaying ? (<PauseIcon className="size-6 text-blue-500" />) : (<PlayIcon className="size-6 text-blue-500" />)}
      </button>
      <button onClick={handleStop} className="px-2 py-1">
        <StopIcon className="size-6 text-blue-500" />
      </button>
      <button onClick={handleNext} className="px-2 py-1">
        <ArrowRightEndOnRectangleIcon className="size-6 text-blue-500" />
      </button>
    </div>
  )
}

export default AudioPlayer
