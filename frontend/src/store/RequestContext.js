// import React, { createContext, useContext, useState, useEffect} from "react";

// const RequestContext = createContext();

// const RequestProvider = ({ children }) => {
//     const [requests_ctx, setRequestsCtx] = useState([]);

//     const addRequest = (request) => setRequestsCtx([...requests_ctx, request]);

//     <RequestContext.Provider value={{ requests_ctx, addRequest }}>
//       {children}
//     </RequestContext.Provider>
// }

// const useReq = () => {
//     const context = useContext(RequestContext);
//     if(!context){
//         throw new Error('useReq must be used within an ReqProvider')
//     }
//     return context;
// }

// export { RequestProvider, useReq }