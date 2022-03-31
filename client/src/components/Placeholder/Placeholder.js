// Styles
import { Progress } from 'reactstrap';
// React
import { useEffect, useState } from 'react';

export const Placeholder = () => {
    const [progressValue, setProgressValue] = useState(0);
    useEffect(() => {
        let firstHalfIntervalId;
        if (progressValue !== 100) {
            firstHalfIntervalId = setInterval(() => {
                console.log(progressValue)
                setProgressValue(progressValue + 1);
                console.log(progressValue)
            }, 400);
        }
        return () => clearInterval(firstHalfIntervalId);
    }, [progressValue]);
    
    return (
        <>
            <Progress
                color="primary"
                value={progressValue}
            />
        </>
    )
}