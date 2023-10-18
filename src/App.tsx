import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewNote from "./pages/Form/NewNote";
import EditNote from "./pages/Form/EditNote";
import "bootstrap/dist/css/bootstrap.min.css"; // "bootsrap" yerine "bootstrap"
import { Container } from "react-bootstrap";
import { NoteData, RawNote, Tag } from "./type";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidv4 } from "uuid"; // "u4" yerine "v4"
import { useMemo } from "react";
import MainPage from "./pages/NoteDetail/MainPage";
import NoteDetail from "./pages/NoteDetail/NoteDetail";
import Layout from "./pages/NoteDetail/Layout";

function App() {
  // Local storage kullanarak notları ve etiketleri tutan state'leri oluşturuyoruz.
  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  // etiket ID leri ile etiket bilgilerini note aktarma
  const noteWithTags = useMemo(() => {
    // useMemo, bu işlemi sadece 'notes' veya 'tags' dizileri değiştiğinde yeniden hesaplar

    // 'notes' dizisini haritala
    return notes.map((note) => {
      // Her 'note' için yeni bir nesne oluştur
      return {
        ...note, // Varolan 'note' özelliklerini kopyala

        // 'tags' dizisini filtrele ve ilgili etiketleri al
        tags: tags.filter((tag) => note.tagId.includes(tag.id)),
        // Her 'note' öğesi için ilgili etiketleri içeren 'tags' özelliği oluştur
      };
    });
  }, [notes, tags]);
  // 'notes' ve 'tags' dizileri, bu işlemin bağımlılıklarıdır

  // Yeni bir not oluşturan fonksiyon.
  const createNote = ({ tags, ...data }: NoteData) => {
    // Notları güncelliyoruz ve yeni notu ekliyoruz.
    setNotes((prev: RawNote) => [
      ...prev,
      { ...data, id: uuidv4(), tagId: tags.map((tag) => tag.id) },
    ]);
  };

  // Yeni bir etiket oluşturan fonksiyon.
  const createTag = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  // not elemanını siler
  const deleteNote=(id:string)=>{
    const filtred = notes.filter((note) => note.id !== id);
    setNotes(filtred);
  }

  // not elemanını güncelleme
 const handleEditNote = (id: string, { tags, ...data }: NoteData) => {
   const updated = notes.map((note) =>
     note.id === id
       ? {
           ...note,
           ...data,
           tagId: tags.map((tag) => tag.id),
         }
       : note
   );
   setNotes(updated);
 };


  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route
            path="/"
            element={<MainPage notes={noteWithTags} availableTags={tags} />}
          />
          <Route
            path="/new"
            element={
              <NewNote
                onSubmit={createNote}
                createTag={createTag}
                availableTags={tags}
              />
            }
          />
          <Route path="/:id" element={<Layout notes={noteWithTags} />}>
            <Route index element={<NoteDetail deleteNote={deleteNote} />} />
            <Route
              path="edit"
              element={
                <EditNote
                  onSubmit={handleEditNote}
                  createTag={createTag}
                  availableTags={tags}
                />
              }
            />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

