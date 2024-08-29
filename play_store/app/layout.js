import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import ResponsiveAppBar from './drawer';
import Provider from '../util/providers';

 export default function RootLayout(props) {
   return (
     <html lang="en">
       <body>
        <ResponsiveAppBar />
        <AppRouterCacheProvider>
          <Provider>
            {props.children}
          </Provider> 
       </AppRouterCacheProvider>
       </body>
     </html>
   );
 }
