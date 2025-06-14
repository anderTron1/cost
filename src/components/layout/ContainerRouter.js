
import { Outlet } from "react-router-dom";
import Container from "./Container";

function ContainerRouter() {
  return (
    <Container customClass="min-height">
      <Outlet />
    </Container>
  );
}

export default ContainerRouter;
