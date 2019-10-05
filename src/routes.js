 import { createAppContainer, createSwitchNavigator } from 'react-navigation';

 import Login from './pages/Login';
 import Book from './pages/Book';
 import List from './pages/List';

 const Routes = createAppContainer(
     createSwitchNavigator({ //instrução para navegação
         Login,
         Book,
         List
     })
 )

 export default Routes;