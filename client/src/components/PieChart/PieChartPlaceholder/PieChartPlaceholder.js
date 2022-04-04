import { PieChart } from "../PieChart";
import {
  exampleUser,
  exampleLangs,
  exampleRepos
} from '../../exampleData.js';

export const PieChartPlaceholder = () => {
    return (
        <PieChart 
            user={exampleUser}
            langs={exampleLangs}
            repos={exampleRepos}
        />
    )
}