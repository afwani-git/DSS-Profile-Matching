import React from "react"
import { Spinner, Card } from "react-bootstrap"

export const Loading: React.FC = () => {
  return (
    <Card
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Card.Body className="d-flex justify-content-center align-items-center">
        <Spinner size="lg" animation="border" />
      </Card.Body>
    </Card>
  )
}
