import { createFileRoute } from "@tanstack/react-router";
import { MembershipNewPage } from "../../features/memberships/pages/MembershipNewPage";

export const Route = createFileRoute("/memberships/new")({
	component: MembershipNewPage,
});
