import type { APIError, State } from "~/types";

const state = reactive<State>({

    isLoading: false,
    appError: null,
    isConfirmModalVisible: false

})

export default () => {


    const { isLoading, appError, isConfirmModalVisible } = toRefs(state);
    const toast = useToast()

    const toggleLoading = (v: boolean) => {
        state.isLoading = v;
    }
    const toggleAlertModal = (v: boolean) => {
        state.isConfirmModalVisible = v;
    }
    const toggleError = (error: null | APIError) => {
        state.appError = error
    }

    const showMessage = (content: { title: string, description?: string }) => {

        toast.add({
            title: content.title,
            description: content.description,
            color: 'primary'
        })

    }

    const showError = (error: APIError) => {

        toast.add({
            title: error.statusCode + '',
            description: error.message ? error.message : error.statusMessage,
            color: 'red'
        })

    }

    return {
        isLoading,
        appError,
        showError,
        showMessage,
        toggleLoading,
        toggleError,
        toggleAlertModal,
        isConfirmModalVisible
    }


}