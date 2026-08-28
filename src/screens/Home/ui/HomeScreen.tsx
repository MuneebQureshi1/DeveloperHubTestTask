import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ROUTES } from '../../../constants/routes';
import { useGlobalStyles } from '../../../globalStyles';
import { useAppTheme, useThemeStore } from '../../../store/useThemeStore';
import { useLanguageStore } from '../../../store/useLanguageStore';
import type { HomeScreenProps } from '../../../types/navigation';
import { resolveBattleOutcome } from '../../../types/creator';
import { Utility } from '../../../utils/responsiveness/utility';
import CelebrationParticles from '../../WinnerCeremony/components/CelebrationParticles';
import ChampionTitle from '../../WinnerCeremony/components/ChampionTitle';
import CountdownDisplay from '../../WinnerCeremony/components/CountdownDisplay';
import CreatorCard, {
  WINNER_CENTER_OFFSET,
} from '../../WinnerCeremony/components/CreatorCard';
import ResolutionButtons from '../../WinnerCeremony/components/ResolutionButtons';
import { MOCK_CREATORS } from '../../WinnerCeremony/data/mockCreators';
import { useCeremonySequence } from '../../WinnerCeremony/hooks/useCeremonySequence';
import { stylesByScheme as ceremonyStylesByScheme } from '../../WinnerCeremony/styles/WinnerCeremonyScreen.styles';

function HomeScreen({ navigation }: HomeScreenProps) {
  const { t } = useTranslation();
  const isRtl = useLanguageStore(state => state.isRtl);
  const scheme = useThemeStore(state => state.scheme);
  const { colors } = useAppTheme();
  const globalStyles = useGlobalStyles();
  const ceremonyStyles = ceremonyStylesByScheme[scheme];
  const insets = useSafeAreaInsets();

  const { winnerSide } = resolveBattleOutcome(MOCK_CREATORS);
  const [leftCreator, rightCreator] = MOCK_CREATORS;

  const {
    countdownValue,
    ceremonyKey,
    particleBurstToken,
    sharedValues,
    replayCeremony,
  } = useCeremonySequence({
    winnerSide,
    centerOffset: WINNER_CENTER_OFFSET,
  });

  const leftCardStyle = useAnimatedStyle(() => ({
    opacity: sharedValues.leftOpacity.value,
    zIndex: 4 + (sharedValues.leftScale.value > 1.05 ? 16 : 0),
    elevation: 4 + (sharedValues.leftScale.value > 1.05 ? 16 : 0),
    transform: [
      { translateX: sharedValues.leftTranslateX.value },
      { translateY: sharedValues.leftTranslateY.value },
      { scale: sharedValues.leftScale.value },
    ],
  }));

  const rightCardStyle = useAnimatedStyle(() => ({
    opacity: sharedValues.rightOpacity.value,
    zIndex: 4 + (sharedValues.rightScale.value > 1.05 ? 16 : 0),
    elevation: 4 + (sharedValues.rightScale.value > 1.05 ? 16 : 0),
    transform: [
      { translateX: sharedValues.rightTranslateX.value },
      { translateY: sharedValues.rightTranslateY.value },
      { scale: sharedValues.rightScale.value },
    ],
  }));

  const vsStyle = useAnimatedStyle(() => ({
    opacity: sharedValues.vsOpacity.value,
    transform: [{ scale: 0.85 + sharedValues.vsOpacity.value * 0.15 }],
  }));

  const trophyStyle = useAnimatedStyle(() => ({
    opacity: sharedValues.trophyOpacity.value,
    transform: [{ scale: sharedValues.trophyScale.value }],
  }));

  const championBannerStyle = useAnimatedStyle(() => ({
    opacity: Math.max(
      sharedValues.trophyOpacity.value,
      sharedValues.championOpacity.value,
    ),
  }));

  const resolutionPanelStyle = useAnimatedStyle(() => ({
    opacity: sharedValues.resolutionOpacity.value,
    transform: [{ translateY: sharedValues.resolutionTranslateY.value }],
  }));

  const cardStyles = {
    panel: ceremonyStyles.panel,
    avatar: ceremonyStyles.avatar,
    name: ceremonyStyles.name,
    category: ceremonyStyles.category,
    scoreLabel: ceremonyStyles.scoreLabel,
    score: ceremonyStyles.score,
    flashOverlay: ceremonyStyles.flashOverlay,
  };

  return (
    <View style={[globalStyles.screen, ceremonyStyles.screen]}>
      <View
        pointerEvents="box-none"
        style={[ceremonyStyles.topBar, { top: insets.top + Utility.SP_8 }]}
      >
        <View pointerEvents="none" style={ceremonyStyles.topBarSide} />
        <View style={ceremonyStyles.topBarCenter}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('replayCeremony')}
            onPress={replayCeremony}
            hitSlop={8}
            style={ceremonyStyles.replayButton}
          >
            <Text style={ceremonyStyles.replayLabel}>{t('replayCeremony')}</Text>
          </Pressable>
        </View>
        <View style={ceremonyStyles.topBarSide}>
          <Pressable
            onPress={() => navigation.navigate(ROUTES.SETTINGS)}
            style={ceremonyStyles.languageButton}
            accessibilityRole="button"
            accessibilityLabel={t('language')}
            hitSlop={8}
          >
            <Text
              style={[
                ceremonyStyles.languageLabel,
                isRtl ? globalStyles.writingRtl : globalStyles.writingLtr,
              ]}
            >
              {t('language')}
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={ceremonyStyles.liveStage} pointerEvents="box-none">
        <View
          style={[
            ceremonyStyles.championSlot,
            { top: insets.top + Utility.SP_52 },
          ]}
          pointerEvents="none"
        >
          <Animated.View style={[ceremonyStyles.championWrap, championBannerStyle]}>
            <Animated.Text style={[ceremonyStyles.trophy, trophyStyle]}>
              🏆
            </Animated.Text>
            <ChampionTitle
              scale={sharedValues.championScale}
              translateY={sharedValues.championTranslateY}
              opacity={sharedValues.championOpacity}
              rotate={sharedValues.championRotate}
              colors={colors}
              title={t('champion')}
            />
          </Animated.View>
        </View>

        <View
          collapsable={false}
          style={ceremonyStyles.cardsArena}
          pointerEvents="box-none"
        >
          <Animated.View style={[ceremonyStyles.cardAnchor, leftCardStyle]}>
            <CreatorCard
              creator={leftCreator}
              scoreFlash={sharedValues.leftScoreFlash}
              goldGlow={sharedValues.leftGoldGlow}
              colors={colors}
              styles={cardStyles}
              scoreLabel={t('score')}
            />
          </Animated.View>
          <Animated.View style={[ceremonyStyles.cardAnchor, rightCardStyle]}>
            <CreatorCard
              creator={rightCreator}
              scoreFlash={sharedValues.rightScoreFlash}
              goldGlow={sharedValues.rightGoldGlow}
              colors={colors}
              styles={cardStyles}
              scoreLabel={t('score')}
            />
          </Animated.View>
          <Animated.View
            pointerEvents="none"
            style={[ceremonyStyles.vsBadge, vsStyle]}
          >
            <Text style={ceremonyStyles.vsText}>{t('vs')}</Text>
          </Animated.View>
        </View>

        <View pointerEvents="none" style={ceremonyStyles.countdownOverlay}>
          <CountdownDisplay
            value={countdownValue}
            scale={sharedValues.countdownScale}
            opacity={sharedValues.countdownOpacity}
            colors={colors}
            label={t('scoreLocksIn')}
          />
        </View>

        <View pointerEvents="none" style={ceremonyStyles.particleWrap}>
          <CelebrationParticles
            key={ceremonyKey}
            colors={colors}
            burstToken={particleBurstToken}
          />
        </View>

        <Animated.View
          style={[
            ceremonyStyles.resolutionWrap,
            { paddingBottom: insets.bottom + Utility.SP_12 },
            resolutionPanelStyle,
          ]}
        >
          <ResolutionButtons
            colors={colors}
            watchReplayLabel={t('watchReplay')}
            backToStageLabel={t('backToStage')}
            button1TranslateY={sharedValues.button1TranslateY}
            button1Opacity={sharedValues.button1Opacity}
            button1Scale={sharedValues.button1Scale}
            button2TranslateY={sharedValues.button2TranslateY}
            button2Opacity={sharedValues.button2Opacity}
            button2Scale={sharedValues.button2Scale}
          />
        </Animated.View>
      </View>
    </View>
  );
}

export default HomeScreen;
