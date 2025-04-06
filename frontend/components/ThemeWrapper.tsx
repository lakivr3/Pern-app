'use client'
import { ThemeContext } from '@/context/theme'
import React, { Dispatch, ReactNode, SetStateAction, useContext } from 'react'
interface ThemeContextType{
    theme:String,
    setTheme:Dispatch<SetStateAction<string>>
}
interface ThemeWrapper{
    children: ReactNode
}

export const ThemeWrapper:React.FC<ThemeWrapper> = ({children}) => {
    
    const themeContext = useContext(ThemeContext)
    if (themeContext === null) {
        return null
      }
  return (
    <div data-theme={themeContext.theme}>{children}</div>
  )
}
