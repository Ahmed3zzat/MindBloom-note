
export type noteState = {
  msg: null | string;
  notes: null | Note[];
  error: string;
  isLoading: boolean;
  isError: boolean;
  idToast:  string ;
};

export interface Note {
  _id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface NotesResponse {
  msg: string;
  notes: Note[];
}
