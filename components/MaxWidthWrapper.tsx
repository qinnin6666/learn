import React, { FC, ReactNode } from 'react'

interface MaxWidthWrapperProps {
  children: ReactNode
}

const MaxWidthWrapper: FC<MaxWidthWrapperProps> = ({ children }) => {
  return <div className={'mx-auto w-full max-w-screen-xl px-2.5 md:px-20'}>{children}</div>
}

export default MaxWidthWrapper
