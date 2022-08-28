import useStore from '../../../hooks/useStore';
import { activatePopup } from '../../popup/popup.slice';
import FormAuth from '../FormAuth';

const useFormAuth = () => {
  const { dispatch } = useStore();

  const handleActivateAuthForm = () => {
    dispatch(activatePopup({ element: FormAuth }));
  };

  return { handleActivateAuthForm };
};

export default useFormAuth;
