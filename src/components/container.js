import React from "react"
import { container } from "./container.module.css"

function Container({ children }) {
  return (
    <div className={container}>
      {children}
    </div>
  )
}

export default Container