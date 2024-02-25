import classes from './steps.module.css'
import {StepDataItemType, StepDataType} from './step-data.tsx';
import StepsItems from './steps-items.tsx';
import React, { useState } from 'react';
import uniqid from 'uniqid';

type CustomElements  = HTMLFormControlsCollection & {
    date: HTMLInputElement;
    distance: HTMLInputElement;
}

type StepsForm = HTMLFormElement & {readonly elements: CustomElements}

export function Steps() {
    const [state, ChangeInfoInList] = useState({
        data: [] as StepDataType,
        editMode: false,
    });

    const [inputState, UpdateInputs] = useState({
        date: '',
        distance: '',
        editMode: false,
    });

    const onSubmit = (e: React.FormEvent<StepsForm>) => {
        e.preventDefault();

        const { date, distance } = (e.target as StepsForm).elements;

        ChangeInfoInList(() => {
            const element = state.data.find(el => el.date.getTime() === (new Date(date.value).getTime()));

            if (element === undefined) {
                return {
                    data: [...state.data,
                        {
                            id: uniqid(),
                            date: new Date(date.value),
                            distance: parseFloat(distance.value)
                        }],
                    editMode: false,
                }
            } else {
                return {
                    data: [...state.data.filter(el => el.id !== element.id),
                        {
                            id: element.id,
                            date: element.date,
                            distance: parseFloat(distance.value) + (inputState.editMode ? 0 : element.distance),
                        }],
                    editMode: false,
                }
            }
        });

        UpdateInputs({
            date: '',
            distance: '',
            editMode: false,
            }
        );
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value } = e.target;

        UpdateInputs({
            ...inputState,
            [name]: value,
            }
        );
    }

    const deleteItem = (item: StepDataItemType) => {
        ChangeInfoInList({
                data: [
                    ...state.data.filter(el => el.id !== item.id)
                ],
                editMode: false,
            }
        );
    }

    const editItem = (item: StepDataItemType) => {
        UpdateInputs({
            date: `${item.date.getFullYear()}-${(item.date.getMonth()+1).toString().padStart(2, '0')}-${item.date.getDate().toString().padStart(2, '0')}`,
            distance: item.distance.toString(),
            editMode: true,
            }
        );
    }

    return (
        <div className={classes["stepsContainer"]}>
            <form className={classes["stepsForm"]} onSubmit={onSubmit}>
                <label>
                    Дата
                    <input type="date" name="date" className={classes["stepsFormDate"]} value={inputState.date} required onChange={onChange}/>
                </label>
                <label>
                    Пройдено, км
                    <input type="number" step="0.01" name="distance" className={classes["stepsFormDistance"]} value={inputState.distance} required onChange={onChange}/>
                </label>
                <button type="submit" className={classes["stepsFormButton"]}>OK</button>
            </form>
            <div>
                <div className={classes["stepsHeader"]}>
                    <a>Дата</a>
                    <a>Пройдено, км</a>
                    <a>Действия</a>
                </div>
                <StepsItems data = {state.data} actions = {{deleteItem: deleteItem, editItem: editItem}}/>
            </div>
        </div>
    )
}

export default Steps;
