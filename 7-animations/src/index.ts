import '../../assets/css/style.css';
import './styles.css';
import { animationDown } from './animate';
import { terminalLog } from '../../utils/log-in-terminal';

const el = document.querySelector('.animated-shape') as HTMLDivElement;

animationDown(el).subscribe({
	next: (y: number) => {
		terminalLog(`Coord: ${y}`);
	},
	complete: () => {
		terminalLog('COMPLETED');
	},
});
