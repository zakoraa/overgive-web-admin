import { AppButtonSm } from "@/core/components/ui/button/app-button-sm";
import {
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@/core/components/ui/table/table";
import { formatDate } from "@/core/utils/date";
import { CampaignCategory } from "@/modules/donation_campaign/types/campaign";
import { categoryDisplay } from "@/modules/donation_campaign/utils/campaign-display";
import CircularLoading from "@/core/components/ui/circular-loading";
import { PlusIcon } from "lucide-react";
import { useCampaignWithSettlementsContext } from "@/modules/donation_settlement/providers/get-campaigns-with-settlements-provider";
import { useRouter } from "next/navigation";

export const DonationSettlementCampaignTable = () => {
  const router = useRouter();
  const { data, isLoading } = useCampaignWithSettlementsContext();

  if (isLoading) return <CircularLoading />;

  //   const { users, sort, setSort } = useHistoryContext();

  const toggleSort = () => {
    // setSort(sort === "asc" ? "desc" : "asc");
  };

  return (
    <div className="w-full overflow-x-auto">
      {data.length === 0 ? (
        <p className="text-xs text-gray-500">Belum ada data</p>
      ) : (
        <>
          <Table className="min-w-full">
            <TableHeader className="bg-gray-50 text-left text-xs font-semibold text-gray-600">
              <TableRow>
                <TableCell isHeader>No</TableCell>
                <TableCell isHeader>Nama</TableCell>
                <TableCell isHeader>Tgl Dibuat</TableCell>
                <TableCell isHeader>Kategori</TableCell>
                <TableCell isHeader>Aksi</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((campaign, index) => (
                <TableRow
                  key={campaign.id}
                  className="transition hover:bg-gray-50"
                >
                  <TableCell className="text-sm text-gray-800">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-sm font-bold text-gray-800">
                    {campaign.title}
                  </TableCell>
                  <TableCell className="text-sm text-gray-800">
                    {formatDate(campaign.created_at)}
                  </TableCell>
                  <TableCell className="text-sm text-gray-800">
                    {categoryDisplay[campaign.category as CampaignCategory]}
                  </TableCell>

                  <TableCell className="flex items-center justify-start space-x-1 text-center">
                    <AppButtonSm
                      icon={<PlusIcon />}
                      text="Tambah Operasional"
                      onClick={() =>
                        router.push(`donation-settlement/${campaign.id}`)
                      }
                      className="bg-blue-400!"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};
