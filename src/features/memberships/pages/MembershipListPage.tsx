import { useMemberships, useDeleteMembership } from "../api";
import { Link } from "@tanstack/react-router";

export const MembershipListPage = () => {
	const { data: memberships, isLoading, isError, error } = useMemberships();
	const deleteProductMutation = useDeleteMembership();
	const handleDelete = (id: string) => {
		if (window.confirm("Are you sure you want to delete this membership?")) {
			deleteProductMutation.mutate(id);
		}
	};

	if (isLoading) return <div>Loading...</div>;

	if (isError) return <div>Error loading products: {error.message}</div>;

	return (
		<div className="p-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Memberships</h1>
				<Link
					to="/memberships/new"
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
				>
					Create New Membership
				</Link>
			</div>

			<table className="min-w-full bg-white">
				<thead>
					<tr>
						<th className="py-2 px-4 border-b">Name</th>
						<th className="py-2 px-4 border-b">Duration</th>
						<th className="py-2 px-4 border-b">Status</th>
						<th className="py-2 px-4 border-b">Price</th>
						<th className="py-2 px-4 border-b">Sevices</th>
						<th className="py-2 px-4 border-b">Actions</th>
					</tr>
				</thead>

				<tbody>
					{memberships?.map((membership) => (
						<tr key={membership.id}>
							<td className="py-2 px-4 border-b text-center">
								{membership.membershipName}
							</td>
							<td className="py-2 px-4 border-b text-center">
								{membership.durationMonths}
							</td>
							<td className="py-2 px-4 border-b text-center">
								{membership.status}
							</td>
							<td className="py-2 px-4 border-b text-center">
								${membership.price}
							</td>
							<td className="py-2 px-4 border-b text-center">
								{membership.services.map((service) => {
									return <div>{service?.name}</div>;
								})}
							</td>
							<td className="py-2 px-4 border-b text-center">
								<Link
									to="/memberships/$membershipsId"
									params={{ membershipsId: membership.id }}
									className="text-indigo-600 hover:text-indigo-900 mr-4"
								>
									Edit
								</Link>
								<button
									onClick={() => handleDelete(membership.id)}
									disabled={deleteProductMutation.isPending}
									className="text-red-600 hover:text-red-900 disabled:opacity-50"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
