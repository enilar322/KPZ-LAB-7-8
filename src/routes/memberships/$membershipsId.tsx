import { createFileRoute } from "@tanstack/react-router";
import { MembershipEdit } from "../../features/memberships/pages/MembershipEdit";

export const Route = createFileRoute("/memberships/$membershipsId")({
	component: MembershipEdit,
});
