import { cn } from '@/lib/utils'

export const Logo = ({ className, uniColor = true }: { className?: string; uniColor?: boolean }) => {
    return (
    <svg
      className={cn("h-10 w-full text-primary transition-transform duration-200 hover:scale-105", className)}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M42.2,31.7a4.6,4.6,0,0,0-4-1.1l-9.9,1.7A4.7,4.7,0,0,0,26.9,29l-7.1-7H5a2,2,0,0,0,0,4H18.2l5.9,5.9a.8.8,0,0,1,0,1.1.9.9,0,0,1-1.2,0l-3.5-3.5a2.1,2.1,0,0,0-2.8,0,2.1,2.1,0,0,0,0,2.9l3.5,3.4a4.5,4.5,0,0,0,3.4,1.4,5.7,5.7,0,0,0,1.8-.3h0l13.6-2.4a1,1,0,0,1,.8.2,1.1,1.1,0,0,1,.3.7,1,1,0,0,1-.8,1L20.6,39.8,9.7,30.9H5a2,2,0,0,0,0,4H8.3L19.4,44l20.5-3.7A4.9,4.9,0,0,0,44,35.4,4.6,4.6,0,0,0,42.2,31.7Z"
        fill="currentColor"
      />
      <path
        d="M34.3,20.1h0a6.7,6.7,0,0,1-4.1-1.3,2,2,0,0,0-2.8.6,1.8,1.8,0,0,0,.3,2.6A10.9,10.9,0,0,0,32,23.8V26a2,2,0,0,0,4,0V23.8a6.3,6.3,0,0,0,3-1.3,4.9,4.9,0,0,0,2-4h0c0-3.7-3.4-4.9-6.3-5.5s-3.5-1.3-3.5-1.8.2-.6.5-.9a3.4,3.4,0,0,1,1.8-.4,6.3,6.3,0,0,1,3.3.9,1.8,1.8,0,0,0,2.7-.5,1.9,1.9,0,0,0-.4-2.8A9.1,9.1,0,0,0,36,6.3V4a2,2,0,0,0-4,0V6.2c-3,.5-5,2.5-5,5.2s3.3,4.9,6.5,5.5,3.3,1.3,3.3,1.8S35.7,20.1,34.3,20.1Z"
        fill="currentColor"
      />
    </svg>
/* 
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000"
            className={cn('text-foreground h-5 w-full', className)}
            viewBox="0 0 797 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <g id="Layer_2" data-name="Layer 2"> 
            <g id="invisible_box" data-name="invisible box"> 
                <rect width="48" height="48" fill="none"></rect> 
            </g> 
            <g id="Icons"> 
                <g> 
                    <path d="M42.2,31.7a4.6,4.6,0,0,0-4-1.1l-9.9,1.7A4.7,4.7,0,0,0,26.9,29l-7.1-7H5a2,2,0,0,0,0,4H18.2l5.9,5.9a.8.8,0,0,1,0,1.1.9.9,0,0,1-1.2,0l-3.5-3.5a2.1,2.1,0,0,0-2.8,0,2.1,2.1,0,0,0,0,2.9l3.5,3.4a4.5,4.5,0,0,0,3.4,1.4,5.7,5.7,0,0,0,1.8-.3h0l13.6-2.4a1,1,0,0,1,.8.2,1.1,1.1,0,0,1,.3.7,1,1,0,0,1-.8,1L20.6,39.8,9.7,30.9H5a2,2,0,0,0,0,4H8.3L19.4,44l20.5-3.7A4.9,4.9,0,0,0,44,35.4,4.6,4.6,0,0,0,42.2,31.7Z"></path> 
                    <path d="M34.3,20.1h0a6.7,6.7,0,0,1-4.1-1.3,2,2,0,0,0-2.8.6,1.8,1.8,0,0,0,.3,2.6A10.9,10.9,0,0,0,32,23.8V26a2,2,0,0,0,4,0V23.8a6.3,6.3,0,0,0,3-1.3,4.9,4.9,0,0,0,2-4h0c0-3.7-3.4-4.9-6.3-5.5s-3.5-1.3-3.5-1.8.2-.6.5-.9a3.4,3.4,0,0,1,1.8-.4,6.3,6.3,0,0,1,3.3.9,1.8,1.8,0,0,0,2.7-.5,1.9,1.9,0,0,0-.4-2.8A9.1,9.1,0,0,0,36,6.3V4a2,2,0,0,0-4,0V6.2c-3,.5-5,2.5-5,5.2s3.3,4.9,6.5,5.5,3.3,1.3,3.3,1.8S35.7,20.1,34.3,20.1Z"></path> 
                    </g> 
                    </g> 
                    </g> 
                    </g>
                    </svg> */
    )
}

export const LogoIcon = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
    return (
        <svg
            className={cn('size-5', className)}
            viewBox="0 0 180 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M80 100H28C12.536 100 0 87.464 0 72V28C0 12.536 12.536 0 28 0H72C87.464 0 100 12.536 100 28V80H160C171.046 80 180 88.9543 180 100V167.639C180 175.215 175.72 182.14 168.944 185.528L103.416 218.292C101.17 219.415 98.6923 220 96.1803 220C87.2442 220 80 212.756 80 203.82V100ZM28 20C23.5817 20 20 23.5817 20 28V72C20 76.4183 23.5817 80 28 80H80V28C80 23.5817 76.4183 20 72 20H28ZM100 100H152C156.418 100 160 103.582 160 108V165.092C160 168.103 158.309 170.859 155.625 172.224L111.625 194.591C106.303 197.296 100 193.429 100 187.459V100Z"
                fill={uniColor ? 'currentColor' : 'url(#paint_logo)'}
            />
            <defs>
                <linearGradient
                    id="paint_logo"
                    x1="90"
                    y1="0"
                    x2="90"
                    y2="220"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9B99FE" />
                    <stop
                        offset="1"
                        stopColor="#2BC8B7"
                    />
                </linearGradient>
            </defs>
        </svg>
    )
}

