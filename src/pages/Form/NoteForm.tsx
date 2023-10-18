import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import ReactSelect from "react-select/creatable";
import { FormEvent, useRef, useState } from "react";
import { NewNoteProps } from "./NewNote";
import { Tag } from "../../type";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

const NoteForm = ({
  onSubmit,
  createTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NewNoteProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate(-1);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Başlık</Form.Label>
              <Form.Control
                defaultValue={title}
                ref={titleRef}
                className="shadow"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="">
              <Form.Label>Etiketler</Form.Label>
              <ReactSelect
                isMulti
                className="shadow"
                // daha önce seçilenleri belirleme
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                // seçilenleri state'e aktarma
                onChange={(tags) =>
                  setSelectedTags(
                    tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  )
                }
                //yeni etiket oluşturma
                onCreateOption={(label) => {
                  const newTag: Tag = { id: v4(), label };
                  createTag(newTag);
                  setSelectedTags([...selectedTags, newTag]);
                }}
                // options
                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group>
          <Form.Label>İçerik</Form.Label>
          <Form.Control
            defaultValue={markdown}
            ref={markdownRef}
            as={"textarea"}
            rows={15}
            required
            className="shadow"
          />
        </Form.Group>

        <Stack direction="horizontal">
          <Button type="submit">Kaydet</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            İptal
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
