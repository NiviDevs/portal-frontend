import { FlickeringGrid } from "../magicui/flickering-grid";

export default function Hero() {
    return (
            <div className="h-screen w-screen overflow-hidden rounded-lg border bg-background">
              <FlickeringGrid
                className="absolute inset-0 z-0 size-full"
                squareSize={10}
                gridGap={6}
                color="#FFFFFF"
                maxOpacity={0.5}
                flickerChance={0.1}
                height={800}
                width={800}
              />
            </div>
    );
}
