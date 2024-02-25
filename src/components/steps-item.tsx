import classes from './steps.module.css'

export function StepsItem({ ...props}) {
    const {item, actions} = props;

    const onClickDeleteButton = () => {
        actions.deleteItem(item);
    }

    const onClickEditButton = () => {
        actions.editItem(item);
    }

    return (
        <li key={item.id} className={classes["stepsItem"]}>
            <a className={classes["stepsItemDate"]}>{item.date.toLocaleDateString()}</a>
            <a className={classes["stepsItemDistance"]}>{item.distance}</a>
            <div className={classes["stepsItemControls"]}>
                <button type="button" onClick={onClickEditButton}>✎</button>
                <button type="button" onClick={onClickDeleteButton}>✘</button>
            </div>
        </li>
    )
}

export default StepsItem;
