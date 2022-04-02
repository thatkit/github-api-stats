// Styles
import { Progress } from 'reactstrap';
// React
import { useEffect, useState } from 'react';

export const Placeholder = () => {
    const [progressValue, setProgressValue] = useState(0);
    useEffect(() => {
        let firstIntervalId;
        if (progressValue <= 100) {
            firstIntervalId = setInterval(() => setProgressValue(progressValue + 2), 100);
        }
        return () => clearInterval(firstIntervalId);
    }, [progressValue]);
    
    return (
        <Progress
            color="primary"
            value={progressValue}
        />
    )
}