export type Note = {
  id: string;
} & NoteData; // NoteData'nın bütün tiplerini buraya aktarır

export type NoteData={
    title: string
    markdown:string
    tags: Tag[]
}

export type Tag = {
  id: string;
  label: string;
};

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagId: string[];
};