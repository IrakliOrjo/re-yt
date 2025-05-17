import { useEffect, useRef, useState } from "react"
import { COMPANY_LOGOS } from "./const"

export const CompanyCarousel = () => {

    const [isScrolling, setIsScrolling] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const startScrolling = () => {
        setIsScrolling(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        
        timeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 3000);
    };

    useEffect(() => {
        startScrolling();
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        container.style.animationPlayState = isScrolling ? 'running' : 'paused';
    }, [isScrolling]);

  return (
    <div className="w-full overflow-hidden">
        <div className="flex flex-col justify-center items-center gap-7 mt-20">
            <p className="font-[500] text-[20px]">Trusted by over 150+ major companies</p>
            <div className="relative max-w-[950px]  overflow-hidden">
            <div 
                className="flex gap-14 animate-scroll whitespace-nowrap cursor-pointer"
                ref={containerRef}
                        onMouseEnter={startScrolling}
                >     
                    {[...COMPANY_LOGOS,...COMPANY_LOGOS].map(logo => {
                        return <img src={logo.logo} width={80} height={100} alt="Company" />
                    })}
            </div>
            </div>
        </div>
    </div>
  )
}

