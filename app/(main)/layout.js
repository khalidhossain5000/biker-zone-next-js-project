import NavBar from "@/components/(Global)/HomeNav/NavBar/NavBar";

export default function MainLayout({children}){
return(
    <section>
        <header><NavBar/></header>
        <main>
            {children}
        </main>
    </section>
)
}