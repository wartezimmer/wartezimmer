import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, Step } from "../app";

export enum QueueAction {
    CANCEL,
    ARRIVED,
    START_TREATMENT,
    STOP_TREATMENT,
}

export function alterCurrentQueue(action: QueueAction) {
    return async (dispatch: ReduxDispatch) => {
        // todo
        // const result = await (await fetch("/backend/")).json();
        dispatch(AppApi.gotoStep(Step.Search));
        switch (action) {
            case QueueAction.ARRIVED:
                dispatch(AppApi.gotoStep(Step.Wait));
                break;
            case QueueAction.CANCEL:
                dispatch(AppApi.gotoStep(Step.Enqueue));
                break;
            case QueueAction.START_TREATMENT:
                dispatch(AppApi.gotoStep(Step.Treatment));
                break;
            case QueueAction.STOP_TREATMENT:
                dispatch(AppApi.gotoStep(Step.GoodBye));
                break;
        }
    };
}
