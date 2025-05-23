import { getUserPointsDetail } from "@/lib/server/users";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTitleNameInitials } from "@/lib/utils";
import { CONFIG } from "@/lib/constants";
import { DeleteButton, VerifyButton } from "@/components/users/verify-btn";
import { PointProgress } from "@/components/users/points-progress";
import { Badge } from "@/components/ui/badge";
import { PhotoProvider } from "@/components/photo-provider";
import { DetailField } from "@/components/detail-field";
const dateFormat = (date: string, withTime: boolean = false) => {
  if (withTime) {
    return format(date, "PPpp");
  }
  return format(date, "PP");
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  // let user;

  const { user, count } = await getUserPointsDetail(id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Card className="m-12 min-w-[32rem]">
      <CardHeader>
        <CardTitle>User Details</CardTitle>
        <CardDescription>This is a read only details</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-12">
        <div className="flex w-28 flex-col items-center">
          {user?.photo && (
            <Avatar className="mb-6 h-20 w-20 border">
              {user?.photo ? (
                <PhotoProvider src={user?.photo.img_file}>
                  <AvatarImage
                    src={user?.photo.img_file}
                    className="cursor-pointer duration-150 hover:opacity-75"
                  />
                </PhotoProvider>
              ) : (
                <AvatarFallback className="text-black">
                  {getTitleNameInitials(user.first_name + user.last_name)}
                </AvatarFallback>
              )}
            </Avatar>
          )}

          {user?.is_verified ? (
            <Badge variant="default" className="bg-green-500">
              Verified
            </Badge>
          ) : (
            <Badge variant="outline">Unverified</Badge>
          )}
        </div>
        <div className="grid w-full grid-cols-2 gap-4">
          <DetailField
            value={user?.first_name}
            placeholder="No first name"
            label="First Name"
          />
          <DetailField
            value={user?.last_name}
            placeholder="No last name"
            label="Last Name"
          />
          <DetailField
            value={user?.email}
            placeholder="No email"
            label="Email"
          />
          <DetailField
            value={user?.phone_number}
            placeholder="No phone number"
            label="Phone number"
          />

          <div className="text-neutral-400">
            <small className="font-bold">
              Date joined:
              <span className="small font-medium">
                {" "}
                {dateFormat(user?.date_joined)}
              </span>
            </small>

            {/* <Input value="" disabled placeholder="No Email" /> */}
          </div>
          <div className="text-neutral-400">
            <small className="font-bold">
              Last login:
              <span className="small font-medium">
                {" "}
                {user?.last_login ? dateFormat(user.last_login, true) : "None"}
              </span>
            </small>
          </div>
          <div className="col-start-1 col-end-3">
            <PointProgress
              userId={+id}
              points={count}
              maxPoints={CONFIG.maxPoints}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        {/* <Button variant="secondary">Unverify</Button> */}
        <VerifyButton id={id} verified={user?.is_verified} />
        <DeleteButton id={id} />
      </CardFooter>
      {/* <code>{JSON.stringify(data)}</code> */}
    </Card>
  );
}
