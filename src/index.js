import './scss/index.scss';
import {Router} from '@core/routes/Router';
import {DashboardPage} from '@/pages/DashboardPage';
import {ExcelPage} from '@/pages/ExcelPage';

const router = new Router('#app', {
	dashboard: DashboardPage,
	excel: ExcelPage,
});
router.init();
