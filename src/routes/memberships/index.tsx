import { createFileRoute } from "@tanstack/react-router";
import { MembershipListPage } from "../../features/memberships/pages/MembershipListPage";

export const Route = createFileRoute("/memberships/")({
	component: MembershipListPage,
});
