import Image from "next/image"

interface HeaderProps{
    label : string
}

export const Header = ({label} : HeaderProps) =>{
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <Image src="/logo.png" width={200} height={200} alt="Logo Not Found" priority={true} />
            <p className="text-muted-foreground text-sm">{label}</p>
        </div>
    )
}