import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useStore = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const call = (actions: any) => {
    dispatch(actions);
  };

  return { state, call };
};

export default useStore;
