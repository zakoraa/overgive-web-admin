export type DistributorForm = {
  name: string;
  email: string;
};

export type Distributor = {
  id: string;
  name: string;
  email: string;
  role: "distributor";
  created_at: string;
};
