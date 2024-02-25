import classes from './steps.module.css'
import StepsItem from './steps-item.tsx';
import {StepDataItemType} from './step-data.tsx';

export function StepsItems({ ...props}) {

    return (
        <ul className={classes["stepsItems"]}>
            {props.data.
                sort((a: StepDataItemType, b: StepDataItemType) => {return b.date.getTime() - a.date.getTime()}).
                map((item: StepDataItemType) =>
                <StepsItem key={item.id} item = {item} actions = {props.actions}/>
            )
            }
        </ul>
    )
}

export default StepsItems;
