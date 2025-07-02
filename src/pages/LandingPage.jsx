import { BlurFade } from "../components/magicui/blur-fade";
import { FlickeringGrid } from "../components/magicui/flickering-grid";

export default function LandingPage() {
	return (
		<BlurFade className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-300 to-sky-500">
			<FlickeringGrid
				className="z-[-1]"
				squareSize={13}
				gridGap={6}
				color="#000000"
				maxOpacity={0.3}
				flickerChance={0.2}
				height={window.innerHeight}
				width={window.innerWidth}
			/>
		</BlurFade>
	);
}
