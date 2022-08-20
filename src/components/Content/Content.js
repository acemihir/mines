import Logo from "../Logo";
import GameBoard from "../GameBoard";
import BettingPanel from "../BettingPanel";
import RecentPlays from "../RecentPlays";
const Content = ({ loading, setLoading }) => {
  return (
    <>
      <Logo />
      <GameBoard />
      <BettingPanel loading={loading} setLoading={setLoading} />
      <RecentPlays />
    </>
  );
};

export default Content;
