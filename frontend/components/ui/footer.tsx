export default function Footer() {
    return (
        <footer className="border-t py-12">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">EduScraperBG</h3>
            <p className="text-sm text-muted-foreground">
              Интелигентна помощ за българските ученици.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Предмети</h3>
            <ul className="space-y-2 text-sm">
              <li><a className="text-muted-foreground hover:text-foreground">Български език</a></li>
              {/* <li><a href="#" className="text-muted-foreground hover:text-foreground">Математика</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">История</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">География</a></li> */}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Ресурси</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Документация</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Контакти</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">zhelezov.krasimir@gmail.com</li>
              <li className="text-muted-foreground">+359 89 561 6921</li>
            </ul>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 EduScraperBG. Всички права запазени.</p>
        </div>
      </footer>
    )
}