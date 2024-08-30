import React, { useState } from 'react'
import { Pagination, Button } from 'antd';
import './App.css'

const videos = ["plan43064.mp4","language32146.mp4","thursday58359.mp4","bar65137.mp4","city10899.mp4","time68171.mp4","far21052.mp4","hearing26986.mp4","police43533.mp4","girl24612.mp4","sandwich49253.mp4","wrong64095.mp4","jacket30843.mp4","wife63325.mp4","internet30241.mp4","hurry28424.mp4","work63769.mp4","meet35521.mp4","game24030.mp4","husband28471.mp4","thanksgiving57645.mp4","yes64296.mp4","first22071.mp4","fault21272.mp4","bowling07383.mp4","chair09847.mp4","go24970.mp4","decide15041.mp4","who63239.mp4","approve03128.mp4","drop17829.mp4","war62282.mp4","coffee68025.mp4","forget68054.mp4","window63415.mp4","why63279.mp4","write64067.mp4","dance68032.mp4","music37371.mp4","join31147.mp4","your64435.mp4","test57536.mp4","accident00635.mp4","more36837.mp4","write64066.mp4","tall56849.mp4","sunday55780.mp4","decide15040.mp4","ugly60355.mp4","brown07957.mp4","yes64297.mp4","president44375.mp4","laugh32373.mp4","cat69261.mp4","pink68132.mp4","game24031.mp4","rabbit45837.mp4","husband28470.mp4","pants68126.mp4","year64221.mp4","meet35520.mp4","internet30240.mp4","delicious15372.mp4","wait62111.mp4","headache26832.mp4","purple68137.mp4","bed05639.mp4","wrong64094.mp4","tired58596.mp4","cook68029.mp4","police43532.mp4","some69484.mp4","small52562.mp4","russia48909.mp4","where68181.mp4","about00416.mp4","plan43065.mp4","glasses24729.mp4","restaurant47664.mp4","sick69470.mp4","hearing26985.mp4","far21079.mp4","backpack04626.mp4","bird06340.mp4","sandwich49244.mp4","deaf14898.mp4","wrong64082.mp4","back65120.mp4","school68145.mp4","law32453.mp4","mother36939.mp4","play69433.mp4","wait62113.mp4","secretary50037.mp4","copy13258.mp4","window68184.mp4","delicious15364.mp4","rabbit45835.mp4","sick51514.mp4","no69411.mp4","yes64295.mp4","pizza42974.mp4","salt49127.mp4","halloween26250.mp4","ride48052.mp4","war62281.mp4","approve03117.mp4","cheese10260.mp4","bring69250.mp4","your64437.mp4","your64423.mp4","sunday55768.mp4","your64436.mp4","music68105.mp4","country13542.mp4","champion09920.mp4","most36912.mp4","war62280.mp4","brown07968.mp4","time58488.mp4","thin57948.mp4","since69472.mp4","short51206.mp4","yes64294.mp4","president44376.mp4","door17334.mp4","year64222.mp4","sick51515.mp4","hurry28432.mp4","wife63333.mp4","chat10099.mp4","secretary50036.mp4","inform29659.mp4","mother36938.mp4","blanket06560.mp4","deaf14899.mp4","police43519.mp4","share50859.mp4","tea68168.mp4","computer68028.mp4","backpack04627.mp4","letter32956.mp4","hearing26984.mp4","know31900.mp4","brother69251.mp4","party41306.mp4","thursday58367.mp4","behind05814.mp4","behind05800.mp4","no38539.mp4","behind05810.mp4","fine21884.mp4","hair26122.mp4","know31904.mp4","headache26835.mp4","teacher57046.mp4","law32456.mp4","wrong64093.mp4","east18296.mp4","help27194.mp4","school49603.mp4","all02000.mp4","cat09431.mp4","thanksgiving57643.mp4","salt49136.mp4","pizza42971.mp4","help69364.mp4","knife31849.mp4","study55373.mp4","chair09855.mp4","halloween26255.mp4","who68183.mp4","fish22128.mp4","drink17729.mp4","green25692.mp4","country13546.mp4","country13552.mp4","now69413.mp4","tell57278.mp4","have68069.mp4","write64049.mp4","none38592.mp4","sunday55778.mp4","but68016.mp4","test57519.mp4","city10900.mp4","cool13214.mp4","city10901.mp4","brown69252.mp4","most68102.mp4","old39633.mp4","sunday55779.mp4","test57530.mp4","some68159.mp4","forget68053.mp4","color11752.mp4","write69544.mp4","what62944.mp4","wait62077.mp4","green25693.mp4","good69347.mp4","fault21275.mp4","flower22537.mp4","drink17728.mp4","game24023.mp4","study55372.mp4","salt49137.mp4","thanksgiving57642.mp4","forget65761.mp4","door17331.mp4","work63801.mp4","hurry28423.mp4","light68090.mp4","share50860.mp4","wrong64092.mp4","inform29648.mp4","teacher57047.mp4","hearing65884.mp4","know31905.mp4","small52564.mp4","plan43063.mp4","no38538.mp4","bathroom05299.mp4","last66010.mp4","table56566.mp4","party41315.mp4","city10888.mp4","behind05813.mp4","about00412.mp4","fine21887.mp4","hearing26983.mp4","know31907.mp4","boy07436.mp4","can69257.mp4","law32455.mp4","time58504.mp4","same49173.mp4","hair68064.mp4","east18295.mp4","copy13276.mp4","wife63334.mp4","medicine35461.mp4","eat18332.mp4","work63803.mp4","brother07941.mp4","here69365.mp4","pizza42972.mp4","careful09178.mp4","study55370.mp4","birthday06369.mp4","ugly60345.mp4","travel59479.mp4","birthday06355.mp4","careful09187.mp4","can65294.mp4","have69360.mp4","crash69284.mp4","color11778.mp4","dress17661.mp4","none38585.mp4","year68190.mp4","bathroom05304.mp4","sick68152.mp4","cheese10272.mp4","school49577.mp4","accident00618.mp4","bathroom05305.mp4","cheese10273.mp4","city10902.mp4","children10469.mp4","more36826.mp4","green25690.mp4","corn69282.mp4","home69366.mp4","full23777.mp4","apple03006.mp4","cry14172.mp4","what62984.mp4","study55371.mp4","husband28461.mp4","finish21933.mp4","door17332.mp4","meet35519.mp4","president44364.mp4","medicine35460.mp4","baby04484.mp4","fine68048.mp4","wife63335.mp4","hour28146.mp4","delicious15363.mp4","east18294.mp4","blue68010.mp4","bed05628.mp4","light66069.mp4","law32454.mp4","bird69233.mp4","know31906.mp4","meat35367.mp4","football69331.mp4","hearing26982.mp4","fine21886.mp4","all01912.mp4","restaurant47663.mp4","table56567.mp4","doctor17023.mp4","football22814.mp4","improve29134.mp4","center09729.mp4","cook13162.mp4","cow13681.mp4","headache26844.mp4","teacher57037.mp4","paper41035.mp4","but08432.mp4","room48509.mp4","finish21954.mp4","because05607.mp4","travel68173.mp4","soon53302.mp4","full65792.mp4","like68093.mp4","with63594.mp4","visit61804.mp4","cat09534.mp4","like33281.mp4","hope27922.mp4","before68007.mp4","happy26534.mp4","dog17076.mp4","week62750.mp4","coffee11552.mp4","teacher68166.mp4","pull45252.mp4","happy26535.mp4","give24658.mp4","draw65531.mp4","hat26723.mp4","like33280.mp4","go69345.mp4","orange40126.mp4","discuss16587.mp4","name37575.mp4","teach57066.mp4","finish21955.mp4","good25074.mp4","hour28134.mp4","government25240.mp4","friend23576.mp4","cute14459.mp4","later32319.mp4","how28187.mp4","but08433.mp4","paper41034.mp4","water62479.mp4","paper41008.mp4","center09728.mp4","what69531.mp4","doctor17022.mp4","now38982.mp4","office39454.mp4","clock11198.mp4","leave32673.mp4","where63089.mp4","friendly23579.mp4","please69434.mp4","africa01392.mp4","many69396.mp4","salt69451.mp4","internet30235.mp4","dance14628.mp4","clock11205.mp4","south53490.mp4","name37588.mp4","chat68020.mp4","south53453.mp4","visit61813.mp4","match35122.mp4","bar05099.mp4","kiss31746.mp4","hat26721.mp4","balance04790.mp4","like33282.mp4","problem44689.mp4","city69269.mp4","computer12335.mp4","white69533.mp4","can08948.mp4","always02227.mp4","list33475.mp4","problem44688.mp4","learn68088.mp4","paint40845.mp4","new69407.mp4","problem44677.mp4","drive17751.mp4","match35123.mp4","hot28074.mp4","cow13708.mp4","crash13799.mp4","buy69255.mp4","clock11204.mp4","south53491.mp4","teach57065.mp4","egg18496.mp4","crash13809.mp4","africa01393.mp4","cheat10146.mp4","enjoy19255.mp4","color69274.mp4","friend23575.mp4","right48120.mp4","name68106.mp4","walk62152.mp4","because05598.mp4","where63088.mp4","cereal69264.mp4","different16190.mp4","class10965.mp4","money36645.mp4","want69524.mp4","snow69481.mp4","back69218.mp4","shirt51054.mp4","interest30153.mp4","jump68080.mp4","cook13164.mp4","hair26169.mp4","house28166.mp4","but08434.mp4","apple68003.mp4","headache26842.mp4","paper41033.mp4","bird06326.mp4","have26775.mp4","kill31641.mp4","cereal09782.mp4","africa01383.mp4","christmas10712.mp4","catch09470.mp4","person68129.mp4","ball04833.mp4","father21202.mp4","red46740.mp4","finish21952.mp4","argue03266.mp4","bath05270.mp4","discuss16594.mp4","visit61816.mp4","remember47185.mp4","family20976.mp4","hat26724.mp4","call65290.mp4","kiss31757.mp4","here27254.mp4","need37891.mp4","always02236.mp4","cool69281.mp4","family20989.mp4","practice44080.mp4","sign68154.mp4","pull45268.mp4","like33278.mp4","computer12330.mp4","like33279.mp4","college68026.mp4","computer12331.mp4","family20988.mp4","hope27931.mp4","pull45269.mp4","draw17604.mp4","need37890.mp4","some53190.mp4","new38103.mp4","decide15031.mp4","buy08490.mp4","enjoy68046.mp4","here27269.mp4","yellow69545.mp4","visit61817.mp4","with63593.mp4","remember47184.mp4","past41455.mp4","discuss16595.mp4","flower22554.mp4","discuss16581.mp4","color68027.mp4","finish21953.mp4","again01467.mp4","secretary50050.mp4","feel69319.mp4","father21217.mp4","cereal09783.mp4","africa01382.mp4","catch09459.mp4","government25252.mp4","but08421.mp4","headache26843.mp4","since51772.mp4","but08435.mp4","basketball69225.mp4","cook13165.mp4","hear26938.mp4","balance04804.mp4","white63191.mp4","shirt51069.mp4","class10974.mp4","light33220.mp4","you64386.mp4","clothes68024.mp4","house28165.mp4","pencil41828.mp4","you64351.mp4","disappear16448.mp4","banana04895.mp4","headache26841.mp4","pink42838.mp4","government25244.mp4","kill31656.mp4","feel21439.mp4","crazy13850.mp4","internet30227.mp4","later32335.mp4","heart27013.mp4","late32307.mp4","africa01394.mp4","please43224.mp4","room48518.mp4","egg18485.mp4","late32298.mp4","hard68065.mp4","visit61815.mp4","paint40842.mp4","run48818.mp4","all69206.mp4","orange40122.mp4","yes68192.mp4","right68142.mp4","need37879.mp4","draw68039.mp4","always02235.mp4","computer12333.mp4","more69401.mp4","purple45439.mp4","jacket68079.mp4","delay15317.mp4","hope27932.mp4","yellow64260.mp4","always02234.mp4","orange68122.mp4","buy08478.mp4","need37887.mp4","orange40123.mp4","paint40843.mp4","past41456.mp4","father69318.mp4","visit61814.mp4","discuss16596.mp4","water62508.mp4","rabbit45845.mp4","like69389.mp4","none68111.mp4","secretary50047.mp4","friend23567.mp4","later32334.mp4","government25251.mp4","africa01395.mp4","snow52834.mp4","feel21438.mp4","kill31657.mp4","have26777.mp4","jump65983.mp4","inform29628.mp4","jacket30830.mp4","jump31322.mp4","water68179.mp4","cold11638.mp4","fat21246.mp4","movie68104.mp4","pencil41829.mp4","you64387.mp4","light33221.mp4","money36657.mp4","make34558.mp4","no38541.mp4","tired68172.mp4","hat26688.mp4","all01997.mp4","boy07459.mp4","mother36944.mp4","read46260.mp4","hat68068.mp4","walk62171.mp4","right48117.mp4","woman63675.mp4","bake04773.mp4","animal02581.mp4","father21219.mp4","christmas10696.mp4","college11716.mp4","again01469.mp4","rabbit45848.mp4","remember68141.mp4","how28212.mp4","new38131.mp4","white68182.mp4","want62254.mp4","list33481.mp4","divorce16961.mp4","kiss31758.mp4","day14800.mp4","back04602.mp4","hope27917.mp4","like33277.mp4","baby69217.mp4","football22798.mp4","dog17095.mp4","kiss31759.mp4","book68011.mp4","want62241.mp4","kiss31765.mp4","blue06822.mp4","argue03268.mp4","before05744.mp4","bad04694.mp4","bath05281.mp4","again01468.mp4","remember47174.mp4","cute14450.mp4","crazy13861.mp4","soon53295.mp4","hot28122.mp4","father21218.mp4","trade59206.mp4","pants40993.mp4","cereal09773.mp4","pull69439.mp4","pencil41819.mp4","hot69368.mp4","example20067.mp4","apple02997.mp4","hair26167.mp4","all01996.mp4","last68086.mp4","orange69422.mp4","read70274.mp4","shirt51072.mp4","no38540.mp4","interest30163.mp4","you64389.mp4","center09723.mp4","fat21248.mp4","disappear16447.mp4","cook13154.mp4","black69236.mp4","woman63662.mp4","late32308.mp4","bake04764.mp4","woman63676.mp4","bad04721.mp4","secretary50049.mp4","give69343.mp4","man69395.mp4","hot28120.mp4","college11715.mp4","bath05283.mp4","before05746.mp4","dance14621.mp4","live33537.mp4","ride48038.mp4","list33482.mp4","run48817.mp4","tall56835.mp4","paint68125.mp4","buy08489.mp4","need37889.mp4","stay54548.mp4","door68038.mp4","convince13135.mp4","clothes11305.mp4","coffee11564.mp4","computer12329.mp4","give24652.mp4","pull45271.mp4","family20990.mp4","with68186.mp4","need37888.mp4","class68021.mp4","run48816.mp4","girl69342.mp4","banana04904.mp4","here27271.mp4","book68012.mp4","drive17770.mp4","learn32614.mp4","water62507.mp4","bath05282.mp4","argue03280.mp4","green69353.mp4","before05747.mp4","again01457.mp4","mean35305.mp4","with63574.mp4","change09968.mp4","college11714.mp4","secretary50048.mp4","hot28121.mp4","crazy13862.mp4","bad04720.mp4","woman63677.mp4","kill31658.mp4","wrong68189.mp4","cold65377.mp4","milk36044.mp4","walk62173.mp4","tomato58782.mp4","none69412.mp4","different16199.mp4","example20064.mp4","house28157.mp4","easy18301.mp4","hair26170.mp4","all01995.mp4","you64388.mp4","daughter14758.mp4","money36658.mp4","shirt51071.mp4","daughter14748.mp4","paper68127.mp4","because05595.mp4","drink69302.mp4","milk36054.mp4","tomato58792.mp4","milk68100.mp4","mother36942.mp4","crash13810.mp4","hot28119.mp4","arrive03442.mp4","dance14630.mp4","different16200.mp4","college11704.mp4","man34685.mp4","cow13705.mp4","white63210.mp4","graduate25332.mp4","student55346.mp4","business08376.mp4","divorce16973.mp4","decide15039.mp4","banana04900.mp4","orange40114.mp4","with69539.mp4","cousin13643.mp4","clothes11314.mp4","stay54565.mp4","practice44089.mp4","cow69283.mp4","list33450.mp4","can08945.mp4","problem44684.mp4","stay54564.mp4","purple45432.mp4","give24657.mp4","happy26506.mp4","clothes11315.mp4","want62253.mp4","drop65544.mp4","business08363.mp4","who63240.mp4","call08706.mp4","dog17093.mp4","graduate25333.mp4","basketball05241.mp4","business08377.mp4","white63211.mp4","hard69358.mp4","hearing68070.mp4","ball69221.mp4","cow13704.mp4","check65343.mp4","eat68044.mp4","different16201.mp4","south53489.mp4","dance14631.mp4","arrive03443.mp4","change09945.mp4","hot28118.mp4","room48507.mp4","please43213.mp4","brother07929.mp4","bed05641.mp4","pink42827.mp4","tomato58793.mp4","read46273.mp4","hat69359.mp4","center09727.mp4","office39465.mp4","example20075.mp4","learn32598.mp4","want68178.mp4","run48797.mp4","book69241.mp4","where63079.mp4","plan43037.mp4","class69270.mp4","doctor17007.mp4","center09719.mp4","clock11197.mp4","boy07460.mp4","jump69380.mp4","easy18312.mp4","mother36941.mp4","pizza69431.mp4","have26757.mp4","since51779.mp4","go24857.mp4","animal02590.mp4","enjoy19267.mp4","name37587.mp4","thin57919.mp4","learn32613.mp4","student55345.mp4","business08375.mp4","tea57083.mp4","student69494.mp4","list33484.mp4","give24655.mp4","yellow64268.mp4","convince13133.mp4","computer12306.mp4","can08946.mp4","chair68019.mp4","week62749.mp4","interest65950.mp4","clothes11316.mp4","yellow64269.mp4","graduate25318.mp4","business08374.mp4","student55344.mp4","game68056.mp4","white63212.mp4","cow13707.mp4","blue69238.mp4","name69405.mp4","name37586.mp4","purple69440.mp4","enjoy19266.mp4","some53213.mp4","cheat10161.mp4","feel21425.mp4","trade59203.mp4","soon53290.mp4","meet68099.mp4","mother36940.mp4","center09730.mp4","day14780.mp4","leave32655.mp4","interest30164.mp4","friendly23588.mp4","about00422.mp4","take56652.mp4","pants66261.mp4","russia48901.mp4","far21073.mp4","red69446.mp4","forget22961.mp4","mother36927.mp4","dark69290.mp4","share50846.mp4","man34743.mp4","eat18316.mp4","theory57781.mp4","good25037.mp4","year64201.mp4","fault21284.mp4","red46738.mp4","show51357.mp4","now39001.mp4","live33543.mp4","door17317.mp4","fish22127.mp4","person42196.mp4","blue06840.mp4","mother69402.mp4","home27762.mp4","children10464.mp4","most36919.mp4","tell57288.mp4","lose34002.mp4","yes69546.mp4","dog69298.mp4","tell57289.mp4","take69500.mp4","easy68043.mp4","cough13476.mp4","humble28306.mp4","who63219.mp4","yes64275.mp4","blue06841.mp4","fish69325.mp4","fish22126.mp4","woman68187.mp4","catch69262.mp4","salt49138.mp4","house69369.mp4","hard26576.mp4","sick51494.mp4","teacher57048.mp4","how69370.mp4","person42236.mp4","about00423.mp4","bathroom05296.mp4","sign51633.mp4","person42234.mp4","language32164.mp4","yesterday64303.mp4","son53276.mp4","deaf68033.mp4","finish68050.mp4","environment19402.mp4","forget22962.mp4","pink42840.mp4","check10195.mp4","hour28148.mp4","candy08927.mp4","ball04860.mp4","bring07812.mp4","show66473.mp4","snow52865.mp4","old69419.mp4","future23945.mp4","now39002.mp4","who69534.mp4","train59298.mp4","birthday06366.mp4","drink17725.mp4","drink17731.mp4","full23779.mp4","you69547.mp4","cough13474.mp4","cool65403.mp4","play43166.mp4","approve03122.mp4","champion09914.mp4","color11777.mp4","no38482.mp4","join31159.mp4","family69316.mp4","lose34015.mp4","purple45440.mp4","lose34014.mp4","girl24590.mp4","dark14682.mp4","dark14669.mp4","color11776.mp4","basketball05227.mp4","know31896.mp4","humble28311.mp4","cough13475.mp4","blue06842.mp4","different68034.mp4","drink17730.mp4","full23778.mp4","fish22125.mp4","birthday06367.mp4","red46712.mp4","before05724.mp4","knife31850.mp4","yellow68191.mp4","study55356.mp4","school69455.mp4","now39003.mp4","green25674.mp4","apple69213.mp4","movie37120.mp4","feel21440.mp4","ball04861.mp4","bring07813.mp4","candy08926.mp4","check10194.mp4","east18270.mp4","tired58588.mp4","forget22963.mp4","son53277.mp4","behind05809.mp4","all68001.mp4","party41323.mp4","black06481.mp4","yesterday64312.mp4","about00424.mp4","small52550.mp4","hear26953.mp4","check10184.mp4","pink69430.mp4","day69291.mp4","tired58598.mp4","future23954.mp4","movie37130.mp4","ball04859.mp4","hard26559.mp4","bring07803.mp4","same49186.mp4","book07075.mp4","bowling07401.mp4","meet35506.mp4","fish22109.mp4","halloween26260.mp4","play68133.mp4","many34834.mp4","letter68089.mp4","brown07971.mp4","cry14186.mp4","approve03127.mp4","russia48898.mp4","tea57034.mp4","lose34004.mp4","week62728.mp4","music37356.mp4","dress68040.mp4","war62267.mp4","convince13146.mp4","join31161.mp4","more36838.mp4","paint40816.mp4","approve03126.mp4","many34835.mp4","thin57950.mp4","arrive03434.mp4","knife31841.mp4","train59317.mp4","heart27053.mp4","theory57792.mp4","no68110.mp4","drink68042.mp4","man34744.mp4","blanket06550.mp4","teach68167.mp4","hear26946.mp4","sign51621.mp4","black06480.mp4","yesterday64313.mp4","glasses24718.mp4","restaurant47655.mp4","black06482.mp4","time69511.mp4","environment19410.mp4","son53258.mp4","forget22964.mp4","black06455.mp4","russia48910.mp4","match66106.mp4","meat35353.mp4","backpack04629.mp4","check10193.mp4","fat65692.mp4","close11252.mp4","bad69219.mp4","share50857.mp4","beard05477.mp4","candy08909.mp4","language68085.mp4","travel59504.mp4","same49185.mp4","book07076.mp4","read68138.mp4","eat69307.mp4","pizza42953.mp4","first22096.mp4","here68072.mp4","now39004.mp4","bowling07402.mp4","laugh32395.mp4","home27773.mp4","boy69245.mp4","window63425.mp4","student55332.mp4","tall56850.mp4","last32258.mp4","humble28316.mp4","most36920.mp4","lose34013.mp4","old39604.mp4","your64438.mp4","accident00639.mp4","your64439.mp4","humble28317.mp4","cough13473.mp4","cough13467.mp4","drop17830.mp4","window63424.mp4","tell57273.mp4","play43175.mp4","brown07967.mp4","many34836.mp4","cry14190.mp4","go24969.mp4","many34822.mp4","home27772.mp4","year64211.mp4","teach57035.mp4","baby04512.mp4","corn13309.mp4","cousin65415.mp4","candy68018.mp4","read68139.mp4","deaf14855.mp4","same49184.mp4","language68084.mp4","theory57785.mp4","wait62109.mp4","heart27044.mp4","drink68041.mp4","backpack04614.mp4","deaf14896.mp4","blanket06553.mp4","backpack04628.mp4","russia48911.mp4","disappear16437.mp4","forget22965.mp4","small52552.mp4","black06483.mp4","thursday58368.mp4","walk68177.mp4","table56552.mp4","dog68035.mp4","now68114.mp4",]

const Video = ({path}) => {
  return (
    <video style={{margin: "0px", padding:"0px"}} width="320" height="240" controls autoPlay muted loop>
      <source src={path} type="video/mp4"/>
      Your browser does not support the video tag.
    </video>
  );
};

function App() {
  let [currentPage, setCurrentPage] = useState(0);
  let [videosPerPage, setVideosPerPage] = useState(10);
  let [prefix, setPrefix] = useState("../3D_HANDS_FACE_ASL");

  const onChange = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setVideosPerPage(pageSize);
  };  

  const onAnimationTypeChange = (type) => {
    setPrefix(type)
  }

  return (
    <>
      <div style={{textAlign: "center"}}>
        {
          videos
          .slice(currentPage*videosPerPage, currentPage*videosPerPage+videosPerPage)
          .map((video_path) => (
            <Video key={`${prefix}/${video_path}`} path={`${prefix}/${video_path}`}/>
          ))
        }
      </div>
      <div style={{textAlign: "center", width: "fit"}}>
        <Pagination showQuickJumper pageSize={videosPerPage} defaultCurrent={0} total={videos.length} onChange={onChange} />
        <Button onClick={() => onAnimationTypeChange("../2D_HANDS_ASL")}>2D Hands</Button>
        <Button onClick={() => onAnimationTypeChange("../2D_HANDS_FACE_ASL")}>2D Hands and Face</Button>
        <Button onClick={() => onAnimationTypeChange("../3D_HANDS_ASL")}>3D Hands</Button>
        <Button onClick={() => onAnimationTypeChange("../3D_HANDS_FACE_ASL")}>3D Hands and Face</Button>
      </div>
    </>
  )
}

export default App
