import { Col, Row, Stack, Badge, Button } from "react-bootstrap";
import { useNote } from "./Layout";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown"

type deleteProps={
    deleteNote:(id:string)=>void
}

const NoteDetail = ({ deleteNote }: deleteProps) => {
  const note = useNote();
  console.log(note);
  return (
    <div className="mt-3">
      <Row>
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack direction="horizontal">
              {note.tags.map((tag) => (
                <Badge key={tag.id}>{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs={"auto"}>
          <Link to={`/${note.id}/edit`}>
            <Button variant="outline-primary">Düzenle</Button>
          </Link>

          <Button variant="outline-danger" onClick={() => deleteNote(note.id)}>
            Sil
          </Button>

          <Link to="/">
            <Button variant="outline-secondary">Geri</Button>
          </Link>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </div>
  );
};

export default NoteDetail;
