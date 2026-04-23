import application from "@/modules/application/store/applicationSlice";

//Combinamos los reducers de cada slice en un rootReducer, si creamos un nuevo slice, solo tenemos que importarlo aquí y agregarlo al objeto rootReducer
export const rootReducer = {
  application,
};