import useStore from '../../../../../hooks/useStore';
import popupSlice from '../../../../popup/popup.slice';
import FormAuth from '../FormAuth';

const { act } = popupSlice;

const useFormAuth = () => {
  const { call } = useStore();

  const handleActivateAuthForm = () => {
    call(act.activatePopup({ element: FormAuth }));
  };

  return { handleActivateAuthForm };
};

export default useFormAuth;
