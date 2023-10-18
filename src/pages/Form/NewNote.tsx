import { NoteData, Tag } from "../../type";
import NoteForm from "./NoteForm";

export type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

const NewNote = ({ onSubmit, createTag, availableTags }: NewNoteProps) => {
  return (
    <div className="pt-4">
      <h1>Yeni Not Ekle</h1>
      <NoteForm
        onSubmit={onSubmit}
        createTag={createTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default NewNote;
