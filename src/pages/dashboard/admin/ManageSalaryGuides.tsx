import { useState } from "react";
import toast from "react-hot-toast";

// RTK Query Hooks
import {
  useGetAllSalaryGuidesQuery,
  useCreateSalaryGuideMutation,
  useUpdateSalaryGuideMutation,
  useDeleteSalaryGuideMutation,
} from "@/features/admin/adminApiService";

// Shadcn/ui Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Edit } from "lucide-react";

// Initial state for the form
const initialFormData = {
  jobTitle: "",
  category: "",
  averageSalary: "",
  salaryRange: "", // User yahan "min-max" format me daalega
  jobDescription: "",
  commonSkills: "",
};

const ManageSalaryGuides = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [editingGuideId, setEditingGuideId] = useState<string | null>(null);

  // RTK Query Hooks
  const {
    data: guidesResponse,
    isLoading: isLoadingGuides,
    isError,
  } = useGetAllSalaryGuidesQuery();
  const [createSalaryGuide, { isLoading: isCreating }] =
    useCreateSalaryGuideMutation();
  const [updateSalaryGuide, { isLoading: isUpdating }] =
    useUpdateSalaryGuideMutation();
  const [deleteSalaryGuide] = useDeleteSalaryGuideMutation();

  const guides = guidesResponse?.data || [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingGuideId(null);
  };

  // 👇👇👇 YAHAN BADA CHANGE KIYA GAYA HAI 👇👇👇
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Step 1: User ke input string "min-max" ko split karo
    const rangeParts = formData.salaryRange
      .split("-")
      .map((part) => part.trim());

    // Safety check: Agar format sahi nahi hai to error do
    if (rangeParts.length !== 2 || !rangeParts[0] || !rangeParts[1]) {
      toast.error(
        "Please enter Salary Range in 'min-max' format (e.g., 80000-120000)."
      );
      return;
    }

    // Step 2: Backend ke liye aek object taiyaar karo
    const salaryRangeObject = {
      min: parseInt(rangeParts[0], 10),
      max: parseInt(rangeParts[1], 10),
    };

    // Step 3: Final payload banao jismein salaryRange object ho
    const payload = {
      ...formData,
      averageSalary: Number(formData.averageSalary),
      commonSkills: formData.commonSkills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      salaryRange: salaryRangeObject, // Yahan string ki jagah object bhej rahe hain
    };

    try {
      if (editingGuideId) {
        await updateSalaryGuide({ id: editingGuideId, data: payload }).unwrap();
        toast.success("Salary Guide updated successfully!");
      } else {
        await createSalaryGuide(payload).unwrap();
        toast.success("Salary Guide created successfully!");
      }
      resetForm();
    } catch (err: any) {
      console.error("Backend Error Details:", err.data || err);
      const errorMessage =
        err.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };
  // 👆👆👆 YAHAN TAK CHANGES HAIN 👆👆👆

  // 👇👇👇 EDIT FUNCTION MEIN BHI CHANGE KIYA GAYA HAI 👇👇👇
  const handleEdit = (guide: any) => {
    setEditingGuideId(guide._id);

    // Yahan backend se aaye object {min, max} ko wapas "min-max" string banayenge
    const salaryRangeString =
      guide.salaryRange && guide.salaryRange.min !== undefined
        ? `${guide.salaryRange.min}-${guide.salaryRange.max}`
        : "";

    setFormData({
      ...guide,
      salaryRange: salaryRangeString, // Form mein string set kar rahe hain
      commonSkills: Array.isArray(guide.commonSkills)
        ? guide.commonSkills.join(", ")
        : "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // 👆👆👆 YAHAN TAK CHANGES HAIN 👆👆👆

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this salary guide?")) {
      try {
        await deleteSalaryGuide(id).unwrap();
        toast.success("Salary Guide deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete the guide.");
        console.error(err);
      }
    }
  };

  // ... baaki JSX (HTML part) bilkul same rahega, usmein koi change nahi ...
  return (
    <div className="space-y-8">
      {/* --- FORM SECTION (FOR CREATE & EDIT) --- */}
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>
            {editingGuideId ? "Edit Salary Guide" : "Create New Salary Guide"}
          </CardTitle>
          <CardDescription>
            {editingGuideId
              ? "Update the details below."
              : "Fill in the details for the new salary guide entry."}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="averageSalary">Average Salary</Label>
                <Input
                  id="averageSalary"
                  name="averageSalary"
                  type="number"
                  value={formData.averageSalary}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salaryRange">
                  Salary Range (e.g., 80000-120000)
                </Label>
                <Input
                  id="salaryRange"
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="commonSkills">
                Common Skills (comma-separated)
              </Label>
              <Input
                id="commonSkills"
                name="commonSkills"
                value={formData.commonSkills}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" disabled={isCreating || isUpdating}>
              {editingGuideId
                ? isUpdating
                  ? "Updating..."
                  : "Update Guide"
                : isCreating
                  ? "Creating..."
                  : "Create Guide"}
            </Button>
            {editingGuideId && (
              <Button variant="outline" onClick={resetForm}>
                Cancel Edit
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>

      {/* --- DISPLAY SECTION (TABLE OF ALL GUIDES) --- */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Salary Guides</CardTitle>
          <CardDescription>
            View, edit, or delete existing salary guides.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingGuides ? (
            <p>Loading guides...</p>
          ) : isError ? (
            <p className="text-red-500">
              Failed to load salary guides. Please try again.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Avg. Salary</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guides.length > 0 ? (
                  guides.map((guide: any) => (
                    <TableRow key={guide._id}>
                      <TableCell className="font-medium">
                        {guide.jobTitle}
                      </TableCell>
                      <TableCell>{guide.category}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(guide.averageSalary)}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(guide)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(guide._id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No salary guides found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageSalaryGuides;